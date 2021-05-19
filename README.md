# RLParseRawAPIData
Just an quick parser to parse Rocket Leagues raw api request for container drops.  
Outputs an `unordered_map` to use in C++

## Input
The format of the raw api request JSON should be _(at minimal)_:
```ts
{
  Responses: [
    {
      Result: {
        ContainerDrops:[
          {
            SeriesID: Number,
            Drops: [
              {
                ProductID: Number
              }
            ]
          }
        ]
      }
    }
  ]
}
```
## Output
```C++
static std::unordered_map<int, std::vector<int>> seriesItems
{
  {1, { 1000, 1001, 1002, 1003, 1004 } },
  {..., {...} }
};
```
## Usage
Check you have set your json path correctly:   
```js 
var json = require('./containerdrops.json');
```

Then run the code: 
```js 
node parser.js
```

## Notes
Currently made asumptions that the input JSON has only 1 child in the Response array.  
If this is not the case later on, you should change:
```js
let containerDrops = json['Responses'][0].Result.ContainerDrops;
```