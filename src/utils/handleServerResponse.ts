import { clog } from './util/utils';

export default function handleServerResponse(
  response: Record<string, unknown>,
) {
  console.log('handling server resposne', response);

  if ('actions' in response) {
    clog('blue/RESPONSE ACTIONS', { actions: response.actions });
  }
  if ('sysExceptions' in response) {
    clog('red/RESPONSE SYSEXCEPTIONS', { actions: response.sysExceptions });
  }
  if ('exceptions' in response) {
    clog('red/RESPONSE EXCEPTIONS', { actions: response.exceptions });
  }
  if ('sysMessages' in response) {
    clog('green/RESPONSE SYSMESSAGES', { actions: response.sysMessages });
  }
  if ('code' in response) {
    clog('orange/RESPONSE CODE', { actions: response.code });
  }
  if ('load' in response) {
    return response.load;
  }

  return response;
}
