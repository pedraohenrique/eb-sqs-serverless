exports.handler = async (event, context) => {
  const records = event.Records;
  const batchItemFailures = [];

  if (records.length) {
    for (const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);
        if (typeof parsedBody.detail.vehicleNo !== 'string') {
          throw new Error('Vehicle number must be a string');
        }
        console.log(
          `processing vehicle details ${parsedBody.detail.vehicleNo}`
        );
        console.log(`processing is sucessful ${record.messageId}`);
      } catch (err) {
        batchItemFailures.push({
          itemIdentifier: record.messageId,
        });
      }
    }
  }
  return { batchItemFailures };
};
