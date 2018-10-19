import { JolocomLib, claimsMetadata } from 'jolocom-lib'
import { InteractionType } from 'jolocom-lib/js/interactionFlows/types'

const receiver = 'did:jolo:3cc34f1368bed3933b7b77b75b84815c718d5a219fdd77e9a1a03b513ec41925'
const privateIdentityKey = Buffer.from('7A59BC95029803EC082BFEBBA8094F9D6B58AAB1A23B7CA2D9C6B96F21E1A0A4', 'hex')
const reg = JolocomLib.registry.jolocom.create()

reg.authenticate(privateIdentityKey).then(async identityWallet => {
  const cred = await identityWallet.create.signedCredential({
    metadata: claimsMetadata.emailAddress,
    claim: {
      email: 'mock@jolocom.testing'
    },
    subject: receiver
  })
  const credRec = await identityWallet.create.credentialsReceiveJSONWebToken({
    iss: identityWallet.getIdentity().getDID(),
    typ: InteractionType.CredentialsReceive,
    credentialsReceive: {
      signedCredentials: [cred.toJSON()]
    }
  }).encode()
  console.log(credRec)
})
