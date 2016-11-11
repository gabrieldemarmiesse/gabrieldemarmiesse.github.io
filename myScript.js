function add_number() {
    var first_number = parseInt(document.getElementById("Text1").value);
    var result = segmentedSieve(first_number);
    document.getElementById("txtresult").value = result;
}

// Return the list of all prime numbers below n
function sieveOfEratosthenes(n){
	
	// Initialisation of our list.
	// isPrime[a] is true if we think at the current time that a is prime.
	var isPrime = [false,false]
	for (i = 2; i < n; i++) { 
		isPrime.push(true)
		
	}
	// We loop until sqrt(n) because of our inner loop which begin at i*i
	for (i = 2; i <= Math.sqrt(n); i++) { 
		if(isPrime[i] === true){
			
			// We remove all the numbers we can 
			// by multiplying i
			for(j = i*i; j<n; j = j+i){
				isPrime[j] = false
			}
		}
	}
	
	// Now we can put all the prime numbers in a list
	primeNumbers = []
	for(i = 2; i<n; i++){
		
		// isPrime can now tell us if i is prime
		if(isPrime[i] === true){
			primeNumbers.push(i)
			console.log(i)
		}
	}
	return primeNumbers
}

function primeCountingFunction(n){
	return sieveOfEratosthenes(n).length
}




// A more memory friendly version of the sieve_of_eratosthenes
// The space complexity is now O(sqrt(n)) instead of O(n)
// The list "isPrime" is now splitted into smaller lists of size sqrt(n)
function segmentedSieve(n){
	isPrimeSize = Math.ceil(Math.sqrt(n));
	isPrimeNbPieces = Math.ceil(n/isPrimeSize);
	
	mainPrimes = sieveOfEratosthenes(isPrimeSize+1);
	primesCount = mainPrimes.length;
	
	// We are going to increment the multiples of those primes.
	// currentValues is the list that will remember where we left off.
	currentValues = []
	for (i = 0; i < mainPrimes.length; i++){
		square = Math.pow(mainPrimes[i], 2);
		currentValues.push(square);
	}
	
	// We iterate over the pieces of isPrime.
	// But we're not considering the first one, 
	// since it was done with the function sieveOfEratosthenes
	for (j = 1; j < isPrimeNbPieces; j++){
		
		// We create the current piece of isPrime
		isPrimePiece = Array(isPrimeSize).fill(true);
		
		// Now we loop over the prime numbers.
		for (i = 0; i < mainPrimes.length; i++){
			
			while (currentValues[i] <= isPrimeSize*(j+1)){
				isPrimePiece[currentValues[i]-j*isPrimeSize - 1] = false;
				currentValues[i] += mainPrimes[i];
			}
		} 
		
		
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
	
	return primesCount
}
