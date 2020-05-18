exports.handler = async (event, context) => {
  let body = '';
  let statusCode = '200';

  const headers = {};
  const log_data = { event, context };

  try {
    const envelope = JSON.parse(event.body);
    Object.assign(log_data, { envelope });

    const message = envelope.message;
    const chat    = message.chat;

    const response = {
      method:              'sendMessage',
      chat_id:             chat.id,
      text:                `You say: ${message.text}`,
      reply_to_message_id: message.message_id,
    };
    Object.assign(log_data, { response });

    body = JSON.stringify(response);
    Object.assign(headers, {
      'Content-Type': 'application/json',
    });
  } catch (err) {
    console.error(err);
    statusCode = '400';
    body = `${err.name}: ${err.message}`;
  } finally {
    Object.assign(log_data, { statusCode, headers, body });
    console.debug(JSON.stringify(log_data));
  };

  return { statusCode, headers, body };
};
