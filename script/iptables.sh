#!/bin/sh

# Ne pas casser les connexions etablies
iptables -A INPUT  -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m state --state RELATED,ESTABLISHED -j ACCEPT

# ICMP 
iptables -t filter -A INPUT  -p icmp -j DROP

# SSH
iptables -t filter -A INPUT -p tcp --dport 2142  -j ACCEPT

# DNS
iptables -t filter -A INPUT  -p tcp --dport domain -j ACCEPT
iptables -t filter -A INPUT  -p udp --dport domain -j ACCEPT

# HTTP + HTTPS
iptables -t filter -A INPUT  -p tcp --dport http   -j ACCEPT
iptables -t filter -A INPUT  -p tcp --dport https  -j ACCEPT

# Anti-scan
iptables -N SCANNING
iptables -A SCANNING -j LOG -m limit --limit 30/min --log-prefix='[iptables-SCANNING]' --limit-burst 2
iptables -A SCANNING -j DROP
iptables -I INPUT -p tcp --tcp-flags ACK,FIN FIN             -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ACK,PSH PSH             -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ACK,URG URG             -j SCANNING
iptables -I INPUT -p tcp --tcp-flags FIN,RST FIN,RST         -j SCANNING
iptables -I INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN         -j SCANNING
iptables -I INPUT -p tcp --tcp-flags SYN,RST SYN,RST         -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ALL ALL                 -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ALL NONE                -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ALL FIN,PSH,URG         -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ALL SYN,FIN,PSH,URG     -j SCANNING
iptables -I INPUT -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j SCANNING
iptables -I INPUT -m conntrack --ctstate INVALID -j DROP

# Anti DOS
iptables -I INPUT -p tcp --dport 80 -m connlimit --connlimit-above 40 --connlimit-mask 20 -j DROP
iptables -I INPUT -p tcp --dport 443 -m connlimit --connlimit-above 40 --connlimit-mask 20 -j DROP
iptables -I INPUT -p tcp --dport 2142 -m connlimit --connlimit-above 40 --connlimit-mask 20 -j DROP

# Politique par defaut
iptables -t filter -P INPUT REJECT
iptables -t filter -P FORWARD DROP
