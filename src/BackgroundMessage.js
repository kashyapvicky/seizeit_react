import firebase from 'react-native-firebase';

export default async (message) => {
    if (message) {
        const {
            topic, title, body
        } = message.data;
        const notification = new firebase.notifications.Notification()
            .setNotificationId(getRandomNotificationId())
            .setTitle(title)
            .setBody(body)
            .setData(message.data);
        notification
            .android.setChannelId('Defaultl')
            .android.setSmallIcon('icon');
        firebase.notifications().displayNotification(notification);
    }
    Promise.resolve();
};