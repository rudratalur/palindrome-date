function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('')
    return reversedStr;
    // return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reverse = reverseStr(str)

    if (str === reverse) {
        return true;
    }
    return false;
    // return str === reverse;
}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var yyyyddmm = dateStr.year + dateStr.day + dateStr.month;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, yyyyddmm, ddmmyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

//find the next palindromeDate

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (date > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

//NEXT Palindrome           
function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while (1) {
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }

  const bdayInput = document.querySelector("#dob");
const showBtn = document.querySelector("#check-btn");
const resultDiv = document.querySelector("#output");

function clickHandler(e) {
  var bdayString = bdayInput.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    // console.log(date);
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };
    

    // var dateStr = convertDateToStr(date);
    var list = checkPalindromeForAllDateFormats(date);
    console.log(list);
    if(list){
      resultDiv.innerText = "your birthday is palindrome";
    }
    else{
      var [ctr , nextDate] = getNextPalindromeDate(date);
      resultDiv.innerText = `the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.You missed it by ${ctr} Days`
    }
    


    
  }
}

showBtn.addEventListener('click', clickHandler);







var date = {
    day: 31,
    month: 01,
    year: 2021
};





console.log(getNextDate(date))