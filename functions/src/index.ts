import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as toCSV from 'to-csv';
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

export interface DayResult {
    date: string;
    result: string | null;
}

export type VisitStatus = 'active' | 'closed' | 'complete';

export interface Visit {
    id?: string;
    dayResults: DayResult[];
    goalSet: string;
    salesTrend: string;
    status: VisitStatus;
    userId: string;
    visitDate: string;
    visitType: string;
    note: string;
}

export const aggregateResultBoard = functions.firestore
    .document('visits/{visitId}')
    .onWrite(doc => {
        if (doc.data.data() === doc.data.previous.data()) {
            return false;
        }
        const userId = doc.data.data().userId;
        return admin
            .firestore()
            .collection('visits')
            .where('userId', '==', userId)
            .get()
            .then(visitDocsSnapshot => {
                let mostVisitSuccesses = 0;
                visitDocsSnapshot.forEach(visitDocSnapshot => {
                    const successes = getVisitSuccesses(visitDocSnapshot.data() as Visit)
                        .successes;
                    mostVisitSuccesses =
                        successes > mostVisitSuccesses ? successes : mostVisitSuccesses;
                });
                return admin
                    .firestore()
                    .doc(`users/${userId}`)
                    .update({
                        bestScore: mostVisitSuccesses
                    })
                    .then(success => buildAdminReportBasic());
            });
    });

export const sendAdminBasicReportAsCSV = functions.https.onRequest(
    (req: functions.Request, res: functions.Response) => {
        cors(req, res, () => undefined);
        return admin
            .firestore()
            .doc('adminReports/basic')
            .get()
            .then(
                reportSnapshot => {
                    const reportData = reportSnapshot.data().report;
                    const reportDataArray = [];
                    reportData.forEach(userReport => {
                        userReport.visits.forEach(visit => {
                            delete visit.dayResults;
                            visit.visitDate = new Date(
                                visit.visitDate
                            ).toLocaleDateString();
                            reportDataArray.push(visit);
                        });
                    });

                    const mailOptions = {
                        from: '"Genesco HQ" <noreply@firebase.com>',
                        to: req.query.email,
                        subject: `DMIT Report - ${new Date().toDateString()} | ${new Date().toTimeString()}`,
                        text: 'Attached is a report on DMIT performance.',
                        attachments: [
                            {
                                filename: `${new Date().toDateString()}-${new Date().toTimeString()}-admin-report-basic.csv`,
                                content: toCSV(reportDataArray)
                            }
                        ]
                    };

                    return mailTransport
                        .sendMail(mailOptions)
                        .then(() =>
                            res
                                .status(200)
                                .send(JSON.stringify({ status: 200, response: 'ok' }))
                        )
                        .catch(error => {
                            console.error(
                                'There was an error while sending the email:',
                                error
                            );
                            return res.status(500).send({ status: 500, reponse: error });
                        });
                },
                error => res.status(500).send('Failed to fetch report data!')
            );
    }
);

export function getVisitSuccesses(visit: Visit): { successes: number; missed: number } {
    const visitResults = visit.dayResults;
    const visitGoal = parseFloat(visit.goalSet);
    let successes = 0;
    visitResults.forEach(dayResult => {
        const result = parseFloat(dayResult.result);
        successes = result >= visitGoal ? successes + 1 : successes;
    });
    return {
        successes,
        missed: visitResults.filter(result => !!result.result).length - successes
    };
}

export function buildAdminReportBasic() {
    return admin
        .firestore()
        .collection('visits')
        .orderBy('userId')
        .get()
        .then(visitDocsSnapshot => {
            return admin
                .firestore()
                .doc('adminReports/basic')
                .set({ report: groupBy(visitDocsSnapshot.docs, 'userId') });
        });
}

export function groupBy(items: FirebaseFirestore.QueryDocumentSnapshot[], key: string) {
    const sortedItems = items.map(doc => doc.data()).reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item]
        }),
        {}
    );
    const reportArray = [];
    for (const userId in sortedItems) {
        const fullReportVisit = sortedItems[userId].map((visit: Visit) => {
            const successes = getVisitSuccesses(visit);
            return {
                ...visit,
                daysMade: successes.successes,
                daysMissed: successes.missed
            };
        });
        reportArray.push({
            userId,
            visits: fullReportVisit
        });
    }
    return reportArray;
}
