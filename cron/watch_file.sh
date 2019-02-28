#!/bin/bash

original_file=$(cat "/etc/crontab_md5")
test_file=$(md5sum "/etc/crontab")
#diff=$(diff < (echo $original_file) < (echo $test_file))

if [ "$original_file" != "$test_file" ] ; then
	echo $test_file > "/etc/crontab_md5"
	echo "le fichier /etc/crontab a ete modifier" | mail -s "Alerte \\!/" /var/mail/root
fi
