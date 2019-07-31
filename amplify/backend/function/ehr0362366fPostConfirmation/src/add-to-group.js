/* eslint-disable-line */ 
const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ region: 'us-east-1',apiVersion: '2016-04-18' });
  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  const addTenantDefault = {
    UserAttributes: [
      {
        Name: 'custom:tier',
        Value: 'Free'
      },
      {
        Name: 'custom:tenantId',
        Value: Math.random().toString(36).substring(7)
      }
    ],
    UserPoolId: event.userPoolId,
    Username: event.userName
  };
  
  await cognitoidentityserviceprovider.adminUpdateUserAttributes(addTenantDefault).promise();

  cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams, (err) => {
    if (err) {
      callback(err);
    }
    callback(null, event);
  });

};