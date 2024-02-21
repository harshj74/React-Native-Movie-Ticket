import firestore from '@react-native-firebase/firestore'

export const moviesData = () => {
    return firestore().collection('Movies').get().then((res) => {
        const arr: any[] = []
        res.forEach((value) => {
            arr.push(value.data())
        })
        return arr;
    })
}