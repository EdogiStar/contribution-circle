import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { Path } from '@/router/paths'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const { confirmPasswordReset, error } = useAuth()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordsMatch =
    password === confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token || !passwordsMatch) {
      return
    }

    setLoading(true)

    try {
      const result = await confirmPasswordReset(
        token,
        password
      )

      if (result.success) {
        navigate(Path.Login, { replace: true })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <VStack spacing={2} mb={6} align="start">
        <Heading size="lg">Reset Password</Heading>

        <Text color="gray.500">
          Enter and confirm your new password.
        </Text>
      </VStack>

      {error && (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
      )}

      {password &&
        confirmPassword &&
        !passwordsMatch && (
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertDescription>
              Passwords do not match.
            </AlertDescription>
          </Alert>
        )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>New Password</FormLabel>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a new password"
              minLength={8}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm your new password"
              minLength={8}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
            isDisabled={
              !token ||
              !password ||
              !confirmPassword ||
              !passwordsMatch ||
              password.length < 8
            }
          >
            Reset Password
          </Button>
        </VStack>
      </form>

      <Text
        fontSize="sm"
        color="gray.500"
        mt={6}
        textAlign="center"
      >
        <ChakraLink
          color="blue.500"
          onClick={() => navigate(Path.Login)}
          cursor="pointer"
        >
          Back to Sign In
        </ChakraLink>
      </Text>
    </Box>
  )
}
