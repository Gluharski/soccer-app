export const liveMatches = (data) => {
	let league = {};
	let flag = false;

	for (let i = 0; i < data.length; i++) {
		
		if (league[i]) {
			console.log(league[i])
			// console.log(data[i])
		}
	}

	// for (let i = 0; i <= data.length - 1; i++) {
	// 	console.log(data[i]);

	// 	if (league[data[i].league.id]) {
	// 		flag = true;
	// 		break;
	// 	};

	// 	league(data[i]) = true;
	// }

	// if (result) {
	// 	console.log('Array contains duplicate elements');
	// } else {
	// 	console.log('Array does not contain duplicate elements');
	// }


	// for (let item in data) {
	// 	console.log(data[item]);

	// 	// 
	// }
};