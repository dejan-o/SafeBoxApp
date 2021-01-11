import { buttonValues } from '../../constants';

export function handleKeyboardInput(event){
	return (isConfirmed, handlerFunction) => {
		if(isConfirmed)
			return;
		const validKeys = buttonValues.map( button => button.value);
		if(validKeys.includes(event.key))
			handlerFunction(event.key);
	};
   
}