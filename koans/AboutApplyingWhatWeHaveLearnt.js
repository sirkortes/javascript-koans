var _; // globals

describe("About Applying What We Have Learnt", function() {
    
    var products;

    beforeEach(function() {
        products = [{
                name: "Sonoma",
                ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
                containsNuts: false
            },
            {
                name: "Pizza Primavera",
                ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
                containsNuts: false
            },
            {
                name: "South Of The Border",
                ingredients: ["black beans", "jalapenos", "mushrooms"],
                containsNuts: false
            },
            {
                name: "Blue Moon",
                ingredients: ["blue cheese", "garlic", "walnuts"],
                containsNuts: true
            },
            {
                name: "Taste Of Athens",
                ingredients: ["spinach", "kalamata olives", "sesame seeds"],
                containsNuts: true
            }
        ];
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function() {
        var i, j, hasMushrooms, productsICanEat = [];

        for (i = 0; i < products.length; i += 1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (j = 0; j < products[i].ingredients.length; j += 1) {
                    if (products[i].ingredients[j] === "mushrooms") {
                        hasMushrooms = true;
                    }
                }
                if (!hasMushrooms) productsICanEat.push(products[i]);
            }
        }

        expect(productsICanEat.length).toBe(1);

    });

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function() {
        /* solve using filter() & all() / any() */

        var notMushroom = function(ingredient) {
            return (ingredient !== "mushrooms");
        };

        var noNutsOrMushrooms = function(product) {
            if (!product.containsNuts) {
                return _(product.ingredients).all(notMushroom);
            };
        };

        var productsICanEat = _(products).filter(noNutsOrMushrooms);
        expect(productsICanEat.length).toBe(1);

    });

    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function() {

        var sum = 0;

        for (var i = 1; i < 1000; i += 1) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168);

    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function() {

        var calculate = function(total, num) {
            return (num % 3 === 0 || num % 5 === 0) ? (total + num) : total;
        }

        var sum = _.range(1, 1000).reduce(calculate, 0);
        expect(233168).toBe(sum);

    });

    /*********************************************************************************/

    it("should count the ingredient occurrence (imperative)", function() {

        var ingredientCount = {
            "{ingredient name}": 0
        };

        for (i = 0; i < products.length; i += 1) {
            for (j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount['mushrooms']).toBe(2);

    });

    it("should count the ingredient occurrence (functional)", function() {

        var getIngredients = function(product) {
            return product.ingredients
        };

        var quantify = function(count, ingredient) {
            count[ingredient] ? count[ingredient] += 1 : count[ingredient] = 1;
            return count;
        };

        var countIngredients = function(products) {
            return _(products).chain().map(getIngredients).flatten().reduce(quantify, {}).value();
        };

        /* chain() together map(), flatten() and reduce() */
        var ingredientCount = countIngredients(products);
        expect(ingredientCount['mushrooms']).toBe(2);

    });

});

/*********************************************************************************/

describe("EXTRA CREDIT", function() {


    it("should find the largest prime factor of a composite number", function() {
      
        var findLargestPrime = function(number, divisor) {
            if (number !== 1) {
                divisor = divisor || 2;
                while ((number / divisor) % 1 === 0) { number /= divisor; }
                while (((number / divisor) % 1 !== 0) && (number !== 1)) { divisor++; }
                return findLargestPrime(number, divisor);
            }
            return divisor;
        };


        var prime100 = findLargestPrime(100);
        expect(prime100).toBe(5);

        var prime999 = findLargestPrime(999);
        expect(prime999).toBe(37);

        var prime5304 = findLargestPrime(5304);
        expect(prime5304).toBe(17);

        var prime13195 = findLargestPrime(13195);
        expect(prime13195).toBe(29);

        var prime600851475143 = findLargestPrime(600851475143);
        expect(prime600851475143).toBe(6857);

        var prime9997597597597 = findLargestPrime(9997597597597);
        expect(prime9997597597597).toBe(425521);

        console.log("\n\nLargest Primes\n\n100 -> "+prime100+"\n999 -> "+prime999+"\n5304 -> "+prime5304+"\n13195 -> "+prime13195+"\n600851475143 -> "+prime600851475143+"\n9997597597597 -> "+prime9997597597597+"\n\n\n");

    });


    it("should find the largest palindrome made from the product of two 3 digit numbers", function() {
      
        var findPalindrome = function(n1, n2) {

            var product = (n1 * n2);
            var nums = product.toString().split('');
            for (var x = 0; x < Math.floor(nums.length / 2); x++) {
                if (nums[x] !== nums[(nums.length - 1) - x]) {
                    return false;
                }
            }
            return product;
        }

        // find largest palindrome from a product of any-digit-length numbers 
        var findLargestPalindrome = function(digits) {

            var digits = digits || 3;
            var start = Number('1' + Array(digits).join('0'));
            var end = Number('9' + Array(digits).join('9'));
            var largest = { p: 0, n1: 0, n2: 0 };

            for (var n1 = end; n1 >= start; n1--) {

                for (var n2 = end; n2 >= start; n2--) {

                    if (n1 < Math.min(largest.n1, largest.n2)) { break; }

                    var palindrome = findPalindrome(n1, n2);

                    if (palindrome > largest.p) {
                        largest = { p: palindrome, n1: n1, n2: n2 };
                    }
                }
            }

            return largest.p;
        }

        // Returns False if product of numbers is not a palindrome
        expect(findPalindrome(123, 456)).toBe(false);

        var from2DigitNums = findLargestPalindrome(2);
        expect(from2DigitNums).toBe(9009);

        var from3DigitNums = findLargestPalindrome(3);
        expect(from3DigitNums).toBe(906609);

        var from4DigitNums = findLargestPalindrome(4);
        expect(from4DigitNums).toBe(99000099);

        console.log("\n\nLargest Palindromes\n\n2-digit numbers: "+from2DigitNums+"\n3-digit numbers: "+from3DigitNums+"\n4-digit numbers: "+from4DigitNums+"\n\n\n");

    });


    it("should find the smallest number divisible by each of the numbers 1 to 20", function() {

        var isDivisibleBy1to10 = function(n) {
            for (var divisor = 10; divisor > 1; divisor--) {
                if ((n / divisor) % 1 !== 0) {
                    return false;
                }
            };
            return true;
        }

        var isDivisibleBy11to20 = function(n) {
            for (var divisor = 20; divisor > 10; divisor--) {
                if ((n / divisor) % 1 !== 0) {
                    return false;
                }
            };
            return true;
        }

        var findSmallestDivisibleBy1to10 = function() {

            for (var num = 10;; num++) {
                if (isDivisibleBy1to10(num)) {
                    return num;
                }
            }
        }

        var findSmallestDivisibleBy1to20 = function() {

            var step = findSmallestDivisibleBy1to10();
            for (var num = step;; num += step) {
                if (isDivisibleBy11to20(num)) {
                    return num;
                }
            }
        }

        var smallestNumber = findSmallestDivisibleBy1to20();

        var confirmDivisibleBy1to20 = function(n) {
            for (var divisor = 20; divisor > 1; divisor--) {
                if ((n / divisor) % 1 !== 0) {
                    return false;
                }
            }
            return true;
        }

        expect(confirmDivisibleBy1to20(smallestNumber)).toBe(true);
        console.log("\n\nSmallest Number divisible by 1-20 is "+smallestNumber+"\n\n\n");

    });


    it("should find the difference between the sum of the squares and the square of the sums", function() {

        var sumOfSquares = function(amount) {
            return _.range(1, amount + 1).reduce(function(sum, num) {
                return sum += (num * num);
            });
        }

        var squareOfSums = function(amount) {
            return Math.pow(_.range(1, amount + 1).reduce(function(sum, num) {
                return sum += num;
            }), 2);
        }

        var findSumSquaresAndSquareSumsDiff = function(amount) {
            return squareOfSums(amount) - sumOfSquares(amount);
        }

        var first10 = findSumSquaresAndSquareSumsDiff(10);
        expect(first10).toBe(2640);

        var first100 = findSumSquaresAndSquareSumsDiff(100);
        expect(first100).toBe(25164150);

        var first500 = findSumSquaresAndSquareSumsDiff(500);
        expect(first500).toBe(15645770750);

        console.log("\n\nDifference between sum of squares and square of nums\nrange of 10: "+first10+"\nrange of 100: "+first100+"\nrange of 500: "+first500+"\n\n\n");

    });


    it("should find the 10001st prime", function() {

        var isPrime = function(number) {

            for (var n = 2; n < number; n++) {
                if (number % n === 0 && n !== number) {
                    return false;
                }
            }
            return true;
        }

        var getPrimeNth = function(nth) {

            var prime = { id: 2, number: 3 };
            var number = 3;

            while (prime.id < nth) {
                number += 2;
                if (isPrime(number)) {
                    prime = { id: ++prime.id, number: number };
                }
            }
            return prime.number;
        }

        var prime1001 = getPrimeNth(1001);
        expect(prime1001).toBe(7927);

        var prime10001 = getPrimeNth(10001);
        expect(prime10001).toBe(104743);

        console.log("\n\nThe 1001st Prime is: "+prime1001+"\nThe 10001st Prime is: "+prime10001+"\n\n\n");

    });

});