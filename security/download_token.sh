#!/usr/bin/env bash

#path to machine's private key
export KEY_PATH=./cloudify.key
export MANAGER_IP=""

echo "Manager ip is: $MANAGER_IP"
rsync -Pav -e "ssh -o StrictHostKeyChecking=no -i $KEY_PATH" centos@$MANAGER_IP:/opt/cloudify-stage/resources/ ./