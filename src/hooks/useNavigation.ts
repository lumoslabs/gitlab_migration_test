import { useHistory } from "react-router"

export default function useNavigation() {
  const history = useHistory()

  return {
    toHome: () => history.push('/home'),
    toTraining: () => history.push(`/training`),
    toAccountLinking: () => history.push(`/account-linking`),
    toAgeGate: () => history.push(`/age-gate`),
    toGame: (slug: string) => history.push(`/game/${slug}`),
  }
}

