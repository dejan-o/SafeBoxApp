export function handleKeyClick(event){
	return (isConfirmed, reduxAction) => {
		if(isConfirmed)
			return;
		reduxAction(event.target.value);
	};
}