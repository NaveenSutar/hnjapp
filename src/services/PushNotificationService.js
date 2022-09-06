import OneSignal from 'react-native-onesignal';

const PushNotificationService = (function () {
  function _initService() {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('1f6f64e0-8ca7-40a2-bd00-9a8bf51ebc33');

    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }

  async function _handleForegroundNotification() {
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );
  }

  return {
    initService: _initService,
    handleForegroundNotification: _handleForegroundNotification,
  };
})();

export default PushNotificationService;
