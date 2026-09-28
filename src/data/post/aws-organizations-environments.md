---
publishDate: 2024-04-03T00:00:00Z
author: Diego Martin
title: 'Separate AWS environments with Organizations'
excerpt: 'A practical look at managing AWS accounts for test and production, with centralized governance and controlled cross-account access.'
category: tutorials
tags:
  - aws
  - organizations
  - iam
---

As an AWS workload grows, keeping development, test, and production resources in one account can make access control and operational boundaries harder to reason about. Separate AWS accounts provide a stronger boundary: teams can apply different permissions, policies, and budgets to each environment while managing the accounts together with AWS Organizations.

## A management account and member accounts

An AWS organization has a **management account** and one or more **member accounts**. The management account owns the organization and provides a place to manage billing and organization-wide settings. Member accounts hold the workloads. For example, a small setup might have separate accounts for `development`, `test`, and `production`.

These are account boundaries, not just naming conventions. A production account can have tighter permissions and different safeguards from a development account. Organizational units (OUs) let you group accounts and apply service control policies (SCPs) at a suitable level. SCPs set the maximum permissions available to principals in affected accounts; they do not grant permissions by themselves.

## Give people access across accounts

For a new setup, AWS recommends managing workforce access with IAM Identity Center and assigning users or groups to accounts through permission sets. This gives people a centralized sign-in flow and temporary role credentials.

Some organizations still use IAM users in a management account and grant selected users permission to assume roles in member accounts. In that model, each target role's trust policy must trust the source principal, and the source principal also needs an identity policy that allows `sts:AssumeRole`.

For example, an identity policy can grant access to one specific account role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AssumeTestAccountRole",
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::123456789012:role/OrganizationAccountAccessRole"
    }
  ]
}
```

Replace the account ID and role with the values for your environment. Prefer granting access to named accounts and roles instead of using a wildcard account ID. The example role name is common, but account provisioning tools such as AWS Control Tower may use a different role name.

When you create a member account directly through AWS Organizations, AWS creates `OrganizationAccountAccessRole` by default. An account that you invite into the organization does not automatically receive that role; you must create or configure cross-account access for it separately.

## Switch to an environment role

With the permissions and trust relationship in place, a user can switch roles in the AWS console:

1. Sign in using the approved workforce identity.
2. Choose **Switch role** from the account menu.
3. Enter the member account ID and the role name.
4. Choose a display name and color that make the active account easy to recognize.
5. Switch back to the original identity when the work is complete.

Treat a role with administrator permissions as a powerful break-glass tool, not the default for every task. Create narrower roles for routine work, require MFA through your identity system or role conditions, and review access regularly.

AWS Organizations gives teams a useful structure for separating environments, but the structure alone does not make an organization secure. Clear account boundaries, temporary credentials, least-privilege access, and explicit governance policies make those boundaries useful.

## Further reading

- [Accessing member accounts in an organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html)
- [AWS IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
