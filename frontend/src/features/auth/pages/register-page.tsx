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
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { Path } from '@/router/paths'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, error, isLoading } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return
    }

    const result = await register(
      email,
      password,
      firstName,
      lastName
    )

    if (result.success) {
      navigate(Path.Home, { replace: true })
    }
  }

  return (
    <Box>
      <VStack spacing={2} mb={6} align="start">
        <Heading size="lg">Create Account</Heading>
        <Text color="gray.500">
          Sign up to get started.
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
        password !== confirmPassword && (
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
            <FormLabel>First Name</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              minLength={8}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            isDisabled={password !== confirmPassword}
          >
            Create Account
          </Button>
        </VStack>
      </form>

      <Text
        fontSize="sm"
        color="gray.500"
        mt={6}
        textAlign="center"
      >
        Already have an account?{' '}
        <ChakraLink
          color="blue.500"
          onClick={() => navigate(Path.Login)}
          cursor="pointer"
        >
          Sign In
        </ChakraLink>
      </Text>
    </Box>
  )
}
