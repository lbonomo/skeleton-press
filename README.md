# Skeleton Press

## Plugin.

```bash
wget https://github.com/lbonomo/skeleton-press/archive/refs/heads/main.zip
unzip main.zip skeleton-press-main/plugin/*
find skeleton-press-main/plugin/ -type f -exec mv {} ./ \;
rm main.zip
rm -fr skeleton-press-main
```

### Developer Server
To run developer server you need to:
 - Install `Lando`, 
 - Modify `.lando.yml`
 - Run following commands.

```bash
lanod start
lando ssh
/app/tools/wp-init.sh
```
