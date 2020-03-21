# COVID-19 US cases

Just a bunch of scripts I put together to keep track of the COVID-19 outbreak in the United States

* index.js
  * Grabs latest COVID-19 US data from The New York Times and prints it in JSON
* growth
  * Reads the latest number of cases from STDIN and predicts the total number of cases on 05/09/2020
* total
  * Reads raw output from `index.js` from STDIN and prints totals for all of US and NY

## Usage

Grab latest COVID-19 data

```sh
  node index.js >> $(date | sed 's/ /_/g').json
```

Calculate estimated # of cases by May 9th

```sh
  cat Fri_Mar_20_22:32:31_EDT_2020.json | jq '.[].confirmed' | sed 's/,//g;s/"//g' | paste -s -d+ | bc | ./growth
```

See totals for all US and NY

```sh
cat Fri_Mar_20_22:32:31_EDT_2020.json | ./total
```
