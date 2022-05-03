import firebase from '../firebase';

const db = firebase.ref("/stagiaires");

class StagiairesDataService {
    getAll(){
        return db;
    }

    create(stagiaires){
        return db.push(stagiaires);
    }


    update(key, value){
        return db.child(key).update(value);
    }

    delete(key){
        return db.child(key).remove();
    }

    deleteAll(){
        return db.remove();
    }
}
export default new StagiairesDataService();