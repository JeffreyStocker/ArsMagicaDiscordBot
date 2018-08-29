# ArsMagicaDiscordBot
Ars Magica Discord Bot that returns a dice roll

## Commands
All commands are need a commands symbol and then preceeded by the command. The default is #;
example:
```
#roll 5d6
```

### Dice Commands
#### roll
[count]d[size]
rolls a number of dice of a selected size. Other commands may be added on after the count and size. Multiple rolls can be seperated by ','

Currently supports:
>x: repeats the roll multple times

>+: adds value to the total

>-: removes value from the total
<!--
>e: explosion: rerolls a dice and adds
>stress:
>botch
 -->
```
#roll 5d20x2
//will return

```

#### stress
rolls a number of d10 dice that will explode on a 1 and requests you roll for botch on a 0
```
#stress 5
```

#### simple
rolls a number of d10 dice
```
#simple 5
```

#### botch
roll a number of botch dice. A botch die will botch if any roll zero.
```
#botch 5
```

### Character commands
#### create
Creates a new character with a name. The name is case sensitive.
```
#create George
```

#### list
```
#list
//will return
1. George
2. Sam
3. Bob
```

#### select
when selecting a character, you can use either the character's name or their list number shown when using the list command. Names are case sensitive
```
#select George
//or
#select 1
```

#### selected
selected will return the character you currently have selected
```
#selected
//will return
You have George selected
```

#### stats
stats displays your charater current statistics, such as attributes, forms and techniques.
```
#stats
//will return
@User : George's statistics are:
        Techniques: cr: 17, re: 14, pe: 5, mu: 9, in: 6,
        Forms: an: 5, aq: 5, au: 5, co: 11, he: 6, im: 6, ig: 22, me: 5, te: 7, vi: 7,
        Attributes: str: 1, dex: 0, com: 1, pre: -2, int: 5, qui: 1, sta: 2
```

#### set
set will set each statistics with a stat name, then value
```
#set cr 17 in 6 mu 9 pe 5 re 14 an 5 aq 5 au 5 co 11 he 6 ig 22 im 6 me 5 te 7 vi 7
//will return
@User George has been updated sucessfully
Success: cr,in,mu,pe,re,an,aq,au,co,he,ig,im,me,te,vi
Failed:
```