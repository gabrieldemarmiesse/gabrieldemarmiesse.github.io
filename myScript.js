
// Gets called when the user click on the button
function event1() {
    var userInput = parseInt(document.getElementById("Text1").value);
	
	if (userInput <= 4294967295){
		var result = primeCountingFunction(userInput, "segmentedSieve");
		document.getElementById("txtresult").value = result;
	}
	else{
		document.getElementById("txtresult").value = "This number is too high."
	}
}

// Return the list of all prime numbers below n
function sieveOfEratosthenes(n){
	
	// Initialisation of our list.
	// isPrime[a] is true if we think at the current time that a is prime.
	var isPrime = Array(n).fill(true);
	
	// 0 and 1 aren't prime numbers.
	isPrime[0] = false;
	isPrime[1] = false;
	
	// We can put all the prime numbers that we find in a list.
	var primeNumbers = [];
	
	// We loop until sqrt(n) because of our inner loop which begins at i*i.
	for (var i = 2; i <= Math.sqrt(n); i++) { 
		if(isPrime[i] === true){
			
			// We know that now i is a prime number.
			primeNumbers.push(i);
			
			// Display the prime number in the console for debugging if needed.
			console.log(i);
			
			// We remove all the numbers we can 
			// by multiplying i
			for(var j = i*i; j<n; j = j+i){
				isPrime[j] = false;
			}
		}
	}
	
	
	// We stopped at sqrt(n), now we must collect the remaining results.
	for(var i = Math.ceil(Math.sqrt(n)); i<n; i++){
		
		// isPrime can now tell us if i is prime
		if(isPrime[i] === true){
			primeNumbers.push(i);
			
			// Display the prime number in the console for debugging if needed.
			console.log(i);
		}
	}
	return primeNumbers;
}


// Returns the number of primes before n using either 
// sieveOfEratosthenes or segmentedSieve
function primeCountingFunction(n, algorithm){
	
	switch (algorithm){
		case "sieveOfEratosthenes":
			return sieveOfEratosthenes(n).length;
			break;
			
		case "segmentedSieve":
			return segmentedSieve(n);
			break;
			
		default:
			console.log("The algorithme does not exist.");
	}
}


// A more memory friendly version of the sieve_of_eratosthenes
// The space complexity is now O(sqrt(n)) instead of O(n)
// The list "isPrime" is now splitted into smaller lists of size sqrt(n)
// 
function segmentedSieve(n){
	
	// Checking for limit values:
	if (n <= 2){
		return 0;
	}
	
	// Setting up the segmentation
	var isPrimeSize = Math.ceil(Math.sqrt(n));
	var isPrimeNbPieces = Math.ceil(n/isPrimeSize);
	
	// Obtaining the primes below sqrt(n)
	var mainPrimes = sieveOfEratosthenes(isPrimeSize+1);
	var primesCount = mainPrimes.length;
	
	// We are going to increment the multiples of those primes.
	// currentValues is the list that will remember where we left off.
	currentValues = [];
	for (i = 0; i < mainPrimes.length; i++){
		square = Math.pow(mainPrimes[i], 2);
		currentValues.push(square);
	}
	
	// We iterate over the segments.
	// j=1 because the first segment was done with the function sieveOfEratosthenes.
	for (j = 1; j < isPrimeNbPieces; j++){
		
		// We create the current piece of isPrime
		isPrimePiece = Array(isPrimeSize).fill(true);
		
		// Now we loop over the prime numbers.
		for (i = 0; i < mainPrimes.length; i++){
			
			// While the values that we are testing are lower than the current piece's upper bound
			while (currentValues[i] <= isPrimeSize*(j+1)){
				isPrimePiece[currentValues[i]-j*isPrimeSize - 1] = false;
				currentValues[i] += mainPrimes[i];
			}
		} 
		
		// If it's the last segment, we may need to discard the end of it. 
		if (j === isPrimeNbPieces - 1){
			limit = n - isPrimeSize * (isPrimeNbPieces-1) - 1;
		}
		else{
			limit = isPrimePiece.length;
		}
		
		// We can now collect the results of the piece we have just done
		for (i = 0; i < limit; i++){
			if (isPrimePiece[i] === true){
				primesCount++;
				console.log(i + 1 + j * isPrimeSize);
			}
		}
	}
	
	return primesCount;
}
