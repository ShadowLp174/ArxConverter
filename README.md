# ArxConverter

This userscript converts ARX prices to real currencies and updates the values on the Elite Dangerous DLC store automatically.

![image](https://github.com/ShadowLp174/ArxConverter/assets/66885971/60cbdf28-9d07-4ce4-80bc-1b2863794a8f)

## Installation

This script runs inside [ViolentMonkey](https://violentmonkey.github.io/),
so in order for it to work, you have to install the ViolentMonkey Extension from [here](https://violentmonkey.github.io/get-it/).  
Once ViolentMonkey is installed, clicking on [https://github.com/ShadowLp174/ArxConverter/raw/main/arx-converter-userscript.user.js](https://github.com/ShadowLp174/ArxConverter/raw/main/arx-converter-userscript.user.js)
should open a prompt asking you if you want to install ArxConverter. Click install and you should be good to go! :)

## How does it work?

Let's try converting 17,000 ARX to GBP:

The scripts first looks for the highest possible discounted amount it can get from [https://www.elitedangerous.com/store/arx](here).  
In this case, that is the 16,800 Arx for £9.59 offer.

Now that it has found that, it calculates the remaining ARX (here 200) using the lowest tier.  
For GBP that is the 5000 ARX per £2.99, meaning we pay around 0.06p per ARX. Multiplied by 200, our remaining ARX value, we get about 11.96p.

Add this to our base price of £9.59 and round to 2 decimal places and we get to £9.71.

*Please don't hesitate to create an issue if you think a different approach makes more sense.*

## Other Currencies

This script supports GBP, EUR and USD. To select on of them, edit the value of `useCurrency` (first line of code after the comments) to either 0, 1 or 2.

|GBP|EUR|USD|
|---|---|----
|0|1|2
