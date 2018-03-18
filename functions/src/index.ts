import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const aggregateResultBoard = functions.firestore
    .document('visits/{visitId}')
    .onWrite(doc => {
        const userId = doc.data.data().userId;
        return admin
            .firestore()
            .collection('visits')
            .where('userId', '==', userId)
            .get()
            .then(visitDocsSnapshot => {
                let mostVisitSuccesses = 0;
                visitDocsSnapshot.forEach(visitDocSnapshot => {
                    const visitResults = visitDocSnapshot.data().dayResults;
                    const visitGoal = parseFloat(visitDocSnapshot.data().goalSet);
                    let successes = 0;
                    visitResults.forEach(dayResult => {
                        const result = parseFloat(dayResult.result);
                        successes = result > visitGoal ? successes + 1 : successes;
                    });
                    mostVisitSuccesses =
                        successes > mostVisitSuccesses ? successes : mostVisitSuccesses;
                });
                return admin
                    .firestore()
                    .doc(`users/${userId}`)
                    .update({
                        bestScore: mostVisitSuccesses
                    });
            });
    });
