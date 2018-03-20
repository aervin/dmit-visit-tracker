"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.aggregateResultBoard = functions.firestore
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
            const visitResults = visitDocSnapshot.data().dayResults;
            const visitGoal = parseFloat(visitDocSnapshot.data().goalSet);
            let successes = 0;
            visitResults.forEach(dayResult => {
                const result = parseFloat(dayResult.result);
                successes = result >= visitGoal ? successes + 1 : successes;
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
//# sourceMappingURL=index.js.map