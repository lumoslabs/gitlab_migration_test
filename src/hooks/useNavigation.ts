import { useHistory, useLocation } from "react-router"

export default function useNavigation() {
  const history = useHistory()
  const location = useLocation<{ previous?: string }>()

  const push = (route) => {
    return history.push(route, { previous: location.pathname })
  }

  return {
    toHome: () => push('/home'),
    toTraining: () => push(`/training`),
    toAccountLinking: () => push(`/account-linking`),
    toAgeGate: () => push(`/age-gate`),
    toGame: (slug: string) => push(`/game/${slug}`),
    previous: location.state?.previous
  }
}

