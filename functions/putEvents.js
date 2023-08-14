const {
  EventBridgeClient,
  PutEventsCommand,
} = require('@aws-sdk/client-eventbridge');

const EVENT_BUS_NAME = process.env.EventBusName;
const config = { region: process.env.AWS_REGION };
const client = new EventBridgeClient(config);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const entry = {
    EventBusName: EVENT_BUS_NAME,
    Detail: JSON.stringify({
      vehicleNo: body.vehicleNo,
      NIC: body.nic,
    }),
    Source: 'fuel-app',
    DetailType: 'user-signup',
  };

  try {
    const command = new PutEventsCommand({ Entries: [entry] });
    const response = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
  }
};
