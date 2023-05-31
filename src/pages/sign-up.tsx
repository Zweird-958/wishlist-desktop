import { Button, Card, Container, Input, Spacer, Text } from "@nextui-org/react"

const SignUp = () => {
  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: "100vh" }}
    >
      <Card css={{ mw: "420px", p: "20px" }}>
        <Text
          size={26}
          weight="bold"
          css={{
            as: "center",
            mb: "20px",
            color: "$primary",
          }}
        >
          Inscription
        </Text>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
        />
        <Spacer y={1} />
        <Input.Password
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
        />
        <Spacer y={1} />
        <Button>S'inscire</Button>
      </Card>
    </Container>
  )
}

export default SignUp
