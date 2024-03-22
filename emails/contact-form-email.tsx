import {
  Body,
  Button,
  Container,
  Heading,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface ContactFormEmailProps {
  email: string
  url: string
}

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  email,
  url,
}) => (
  <Html lang="en">
    <Tailwind
      config={{
        fontFamily: {
          Lemon: ['Lemon'],
        },
      }}
    >
      <Body className="px-2 mx-auto my-auto font-sans bg-white">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://res.cloudinary.com/dos8mey8r/image/upload/v1709812092/LeCanard/logo-news_kg4dzs.png"
              width="40"
              height="37"
              alt="La voie de l'info"
              className="mx-auto my-0"
            />
          </Section>

          <Heading className="text-black text-[20px] font-normal text-center p-0 my-[30px] mx-0">
            Verfier vote compte sur <strong>La Voie De L Info</strong>
          </Heading>

          <Text className='text-center'>
            Clicker sur le bouton pour compléter votre enregistrement
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={url}
            >
              Valider
            </Button>
          </Section>
          {/**
 
          <Text className="text-black text-[14px] leading-[24px] max-w-[450px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>
 */}
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default ContactFormEmail
