// import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { useScriptEvents, useServerEvents } from '.';
import type {
  TApiaFieldType,
  TFieldScriptEvents,
  TFieldServerEvents,
  TFormScriptEvents,
  TFrmParent,
} from '../types';

const useEvents = (
  fieldId: string,
  id: string,
  attId: string,
  index: number,
  frmId: string,
  frmName: string,
  frmParent: TFrmParent,
  fieldType: TApiaFieldType,
  fieldName?: string,
  scriptEvents?: TFieldScriptEvents | TFormScriptEvents,
  serverEvents?: TFieldServerEvents,
): [React.SetStateAction<boolean>] => {
  const [resultState] = useScriptEvents(
    fieldId,
    frmName,
    frmParent,
    fieldType,
    fieldName,
    scriptEvents,
  );

  const [, setFireEvents, isFinished] = useServerEvents(
    fieldId,
    id,
    frmId,
    frmParent,
    attId,
    index,
    resultState,
    serverEvents,
  );

  useEffect(() => {
    if (
      (resultState.status === 'none' || resultState.status === 'success') &&
      resultState.firedEventId.length > 0
    ) {
      console.log('useServerEvents:', { ...resultState });
      setFireEvents(true);
    }
  }, [setFireEvents, resultState]);

  return [isFinished];
};

export default useEvents;
