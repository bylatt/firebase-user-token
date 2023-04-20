# Firebase user token

## Install

```bash
npm i -g firebase-user-token
```

## Usage

```bash
futk --serviceAccount={service_account_file_path} --apiKey={api_key} --email={user_email} --output=token
```

## Help

```
futk --help

Options:
  --version         Show version number                                [boolean]
  --serviceAccount  Firebase service account file path       [string] [required]
  --apiKey          Firebase API Key                         [string] [required]
  --output          Output of the program
                                  [string] [required] [choices: "user", "token"]
  --uid             Firebase user id                                    [string]
  --email           Firebase user email                                 [string]
  --phoneNumber     Firebase user phone number                          [string]
  --copy            Copy output to clipboard                           [boolean]
  --help            Show help                                          [boolean]
```
