export function renderSequence(sequence){
	if(sequence.length > 10)
		return sequence.substring(sequence.length-10);
	return sequence;
}