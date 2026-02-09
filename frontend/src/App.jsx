import { useState, useEffect } from 'react'
import { AppShell, Burger, Group, Title, Container, Grid, Paper, Text, Tabs, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconRecycle, IconRefresh } from '@tabler/icons-react'
import Leaderboard from './components/Leaderboard'
import SkillHeatmap from './components/SkillHeatmap'
import CandidateCard from './components/CandidateCard'
import { generateCandidates } from './utils/generateData'

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [sortedCandidates, setSortedCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  useEffect(() => {
    const newData = generateCandidates(40);
    setSortedCandidates(newData);
    setSelectedCandidateId(newData[0].id);
  }, []);

  const handleRefresh = () => {
    const newData = generateCandidates(40);
    setSortedCandidates(newData);
    setSelectedCandidateId(newData[0].id);
  };

  const selectedCandidate = sortedCandidates.find(c => c.id === selectedCandidateId);

  if (sortedCandidates.length === 0) return null; // Or a loader

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconRecycle size={30} color="green" />
          <Title order={3}>RecycleManager AI</Title>
          <Button 
            variant="light" 
            color="blue" 
            leftSection={<IconRefresh size={16} />} 
            onClick={handleRefresh}
            ml="auto"
          >
            Refresh Data
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Tabs defaultValue="top10">
          <Tabs.List mb="sm">
            <Tabs.Tab value="top10">Top 10</Tabs.Tab>
            <Tabs.Tab value="all">All Candidates</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="top10">
            <Leaderboard 
              candidates={sortedCandidates.slice(0, 10)} 
              onSelect={setSelectedCandidateId} 
              selectedId={selectedCandidateId}
            />
          </Tabs.Panel>

          <Tabs.Panel value="all">
            <Leaderboard 
              candidates={sortedCandidates} 
              onSelect={setSelectedCandidateId} 
              selectedId={selectedCandidateId}
            />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container fluid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <CandidateCard candidate={selectedCandidate} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="xs" p="md" withBorder>
                <Title order={4} mb="md">Performance Heatmap</Title>
                <SkillHeatmap candidate={selectedCandidate} />
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
