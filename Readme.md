# Local Server
Normal olarak localde ana tetik mekanizması olarak Express kullanılmayacak 
ancak test amacıyla tetik mekanizmasını taklit etmek için expressjs'in route(endpoint)
mekanizmasını kullandım. Gerçekte ise ana tetik mekanizması olarak 
raspberry'deki '/dev/input/event0' driver'ını kullanarak bir event listener aracılığıyla 
access işlemini gerçekleştireceğiz.Veya tasarıma göre başka bir driver kullanabiliriz.

Tetik mekanizmasından iki adet verinin geleceğini varsaydım: 
    1- personal id ( kart unique id)
    2- door id (her kapıya ait özel bir id)(raspberry boot olduktan sonra üretilen '/etc/machine-id' ile üretilebilir)



# Çalıştırılması
yarn install --frozen-lockfile
yarn start

username: admin
pass: admin