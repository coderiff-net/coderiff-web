---
publishDate: 2026-09-27T00:00:00Z
author: Diego Martin
title: 'Requiring MFA for traditional AWS IAM users'
excerpt: 'A policy pattern for restricting IAM user access until MFA is configured, with important limits to understand before applying it.'
category: tutorials
tags:
  - aws
  - iam
  - security
---

Multi-factor authentication (MFA) adds another check to a sign-in. If an AWS account still uses long-lived IAM users for people, an identity policy can leave users access to a small set of setup actions while denying most other actions until the session is authenticated with MFA.

For a new workforce identity setup, AWS recommends federation and temporary credentials, commonly through IAM Identity Center. This policy pattern is specifically for traditional IAM users. It is not a substitute for configuring MFA in an identity provider or IAM Identity Center.

## A policy pattern for IAM users

The following is an example of the deny statement used to restrict actions when an IAM user's request is not authenticated with MFA. Attach a complete, reviewed policy to a dedicated group or user; this statement alone does not grant the permissions needed to use AWS.

```json
{
  "Sid": "DenyMostActionsWithoutMFA",
  "Effect": "Deny",
  "NotAction": [
    "iam:CreateVirtualMFADevice",
    "iam:EnableMFADevice",
    "iam:GetUser",
    "iam:GetMFADevice",
    "iam:ListMFADevices",
    "iam:ListVirtualMFADevices",
    "iam:ResyncMFADevice",
    "iam:ChangePassword",
    "sts:GetSessionToken"
  ],
  "Resource": "*",
  "Condition": {
    "BoolIfExists": {
      "aws:MultiFactorAuthPresent": "false"
    }
  }
}
```

The exception list is an example, not a universal list. Check the self-service actions your users need and compare them with AWS's current policy examples before deploying a policy. Test with a non-administrator account first and keep a separate administrative recovery path.

## Understand the effect on CLI and API access

`BoolIfExists` makes the deny apply when the MFA context key is absent as well as when it is explicitly false. That can also deny requests signed with long-term access keys, such as many AWS CLI, SDK, and API requests. Do not attach this policy without checking automation and developer workflows that depend on those credentials.

MFA behavior for federated identities is different: the `aws:MultiFactorAuthPresent` key may not be present. Pass an authentication method through your identity provider or configure MFA requirements in the federation or IAM Identity Center setup instead.

Policies are easy to get subtly wrong, especially when a broad `Deny` and `NotAction` are involved. Validate the policy, test both console and programmatic access, and stage rollout so users do not lose their only path to sign in or finish MFA setup.

## Further reading

- [AWS guidance for the `aws:MultiFactorAuthPresent` condition key](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-mfa)
- [AWS example policy for managing your own MFA device](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_my-sec-creds-self-manage-mfa-only.html)
- [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
