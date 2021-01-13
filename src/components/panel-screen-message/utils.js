export function renderSequence(sequence, isLocked){
	let msg = sequence;
	if(msg.length > 10)
		msg = msg.substring(sequence.length-10);
	if(!isLocked && msg[msg.length - 1] === 'L')
		return msg.substring(0, msg.length - 1);
	return msg;
}