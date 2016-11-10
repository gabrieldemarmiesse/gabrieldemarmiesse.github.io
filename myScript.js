function add_number() {
    var first_number = parseInt(document.getElementById("Text1").value);
    var result = sieve_of_eratosthenes(first_number);
    document.getElementById("txtresult").value = result;
}

function sieve_of_eratosthenes(n){
	
	// Initialisation of our list.
	// isPrime[a] is true is we think at the current time that a is prime.
	var isPrime = [false,false]
	for (i = 2; i < n; i++) { 
		isPrime.push(true);
	}
	
	// We loop until sqrt(n) because of our inner loop
	for (i = 2; i < Math.sqrt(n); i++) { 
		if(isPrime[i] === true){
			
			// We remove all the numbers we can 
			// by multiplying i
			for(j = i*i; j<n; j = j+i){
				isPrime[j] = false
			}
		}
	}
	
	// Now we count the number of prime numbers:
	count = 0
	for(i = 2; i<n; i++){
		if(isPrime[i] === true){
			count++
			console.log(i)
		}
	}
	
	
	return count
}