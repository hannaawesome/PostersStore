# JSDecrypt


Descifra en el lado del servidor las galletas rellenas que te vienen cifradas del lado del cliente con [JSEncrypt](http://travistidwell.com/jsencrypt/).

Decrypt on the server side pink unicorns that come from the client side with [JSEncrypt](http://travistidwell.com/jsencrypt/)


## versión Castellano


Generación par de llaves, privada y pública, RSA

```
openssl genrsa -out privada.key 4096
openssl rsa -pubout -in privada.key -out publica.key
```


En el lado del cliente y con el uso de [JSEncrypt](http://travistidwell.com/jsencrypt/demo/index.html), siendo una implementación de cifrado asimétrico, se ha cifrado una cadena, con la pública, que llega al servidor, y se ha de descifrar
con la privada.

```
npm install jsdecrypt
```


Copiamos el contenido de la llave privada, como contenido de la variable, "lallaveprivada"

```
cat privada.key
```


Y código

```
var jsdecrypt = require('jsdecrypt');


var lallaveprivada = '-----BEGIN RSA PRIVATE KEY-----\n\
MIICXAIBAAKBgQCenqBKWqSbqJ4mARAQENYs6lM+uiaoNknhv9bnpsmevuBVLnoV\n\
eAdt2ihE3d0nTpB7zOKo1bqTzo27I/G5DUSk3l2KOsEvABtBuZSdZ9TSE96DdP/Z\n\
JJVBOn/rjnBtGTfD/8AYMEsWKh45hTjI/AB3Ia5Kc5+rV3LiEOVdh4cOWwIDAQAB\n\
AoGANUrwaerocVAGypgC0JMHkpGsJGAgytVqn0l4J96W0RoqfxQdeocYX+UzMGgm\n\
fKVdz+p3oOgmRrDYV67s8RKvI/hX41P8HqDNWfIWd/ukpQnBS/omBbeb3Fd5lcML\n\
308lFNAxjUzN84Dkn5uGsvRuIpBX4TXCbVUQtt4hzegL6vkCQQDsg7aTL8/PMbX4\n\
YGHJRi+Kb9Vx+iZfMzT2jtpnOrA9s2ATE1QMOLOsXs4N31589TQWQvW2pB3/4IG+\n\
1+nGstA9AkEAq7ALq/IedORCRW/gBqDzOAhWGZm/3daLU1jvDrS0ZLEMKnPxThYf\n\
9KAaskeQYov9FV3BtE1Orp4VsWRnrNtqdwJBAMcB7NXcHRdR1LOxJZaeH9J0Vz0Y\n\
JsFj7OSpPswtba39CJIEaWv/Ke+XtfmmQXMTP0ib/vQ3E6cB2Sojsukl/GECQD4N\n\
j/pitT1cbtN3/wmGTMIYyT3RgzZj39GNGEJBb93g29vQMgweFQiugVekY/wqSpvZ\n\
WjSXqHOWcZK/DnW8jDsCQH2Xvlz0uU83M6dlaDDo4IxbqBNO1MW9FLWkIPUfy+Wy\n\
mhE8ZQK2DRTd2UeojcXovMSlGL+vzdWeYxorAf9tQcA=\n\
-----END RSA PRIVATE KEY-----';


var elchoricillo = 'bBAaWhOEtEboZc46K9IykrEtMC/idACvCMEuWM696K6exk8N3lrNuQInCbUFd9bBQdkLrmJZMbU9DovasOu6Q7slN3cPVbnl0RTpt7INTboMV6DFsMDi/c2byDgD+7CgrGhJ2MUrBH+WfnTOD6iZb3N3a5GkkQf7b6vpHiVm2es=';


console.log(jsdecrypt.dec(lallaveprivada, elchoricillo));
```


## english version

Generating key pairs

```
openssl genrsa -out private.key 4096
openssl rsa -pubout -in private.key -out public.key
```

From the client side and using [JSEncrypt](http://travistidwell.com/jsencrypt/demo/index.html), you send a string to the server side


```
npm install jsdecrypt
```


Copy the private key, in the "privkey" variable
```
cat private.key
```


And code

```
var jsdecrypt = require('jsdecrypt');


var privkey = '-----BEGIN RSA PRIVATE KEY-----\n\
MIICXAIBAAKBgQCenqBKWqSbqJ4mARAQENYs6lM+uiaoNknhv9bnpsmevuBVLnoV\n\
eAdt2ihE3d0nTpB7zOKo1bqTzo27I/G5DUSk3l2KOsEvABtBuZSdZ9TSE96DdP/Z\n\
JJVBOn/rjnBtGTfD/8AYMEsWKh45hTjI/AB3Ia5Kc5+rV3LiEOVdh4cOWwIDAQAB\n\
AoGANUrwaerocVAGypgC0JMHkpGsJGAgytVqn0l4J96W0RoqfxQdeocYX+UzMGgm\n\
fKVdz+p3oOgmRrDYV67s8RKvI/hX41P8HqDNWfIWd/ukpQnBS/omBbeb3Fd5lcML\n\
308lFNAxjUzN84Dkn5uGsvRuIpBX4TXCbVUQtt4hzegL6vkCQQDsg7aTL8/PMbX4\n\
YGHJRi+Kb9Vx+iZfMzT2jtpnOrA9s2ATE1QMOLOsXs4N31589TQWQvW2pB3/4IG+\n\
1+nGstA9AkEAq7ALq/IedORCRW/gBqDzOAhWGZm/3daLU1jvDrS0ZLEMKnPxThYf\n\
9KAaskeQYov9FV3BtE1Orp4VsWRnrNtqdwJBAMcB7NXcHRdR1LOxJZaeH9J0Vz0Y\n\
JsFj7OSpPswtba39CJIEaWv/Ke+XtfmmQXMTP0ib/vQ3E6cB2Sojsukl/GECQD4N\n\
j/pitT1cbtN3/wmGTMIYyT3RgzZj39GNGEJBb93g29vQMgweFQiugVekY/wqSpvZ\n\
WjSXqHOWcZK/DnW8jDsCQH2Xvlz0uU83M6dlaDDo4IxbqBNO1MW9FLWkIPUfy+Wy\n\
mhE8ZQK2DRTd2UeojcXovMSlGL+vzdWeYxorAf9tQcA=\n\
-----END RSA PRIVATE KEY-----';


var cryptham = 'bBAaWhOEtEboZc46K9IykrEtMC/idACvCMEuWM696K6exk8N3lrNuQInCbUFd9bBQdkLrmJZMbU9DovasOu6Q7slN3cPVbnl0RTpt7INTboMV6DFsMDi/c2byDgD+7CgrGhJ2MUrBH+WfnTOD6iZb3N3a5GkkQf7b6vpHiVm2es=';


console.log(jsdecrypt.dec(privkey, cryptham));
```


https://www.npmjs.com/package/jsdecrypt

https://github.com/gurumelo/jsdecrypt
