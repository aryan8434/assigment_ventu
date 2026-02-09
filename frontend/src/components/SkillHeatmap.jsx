import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';

export default function SkillHeatmap({ candidate }) {
  // Normalize scores to 0-100 for RingProgress
  const crisis = (candidate.crisis_score / 10) * 100;
  const sustainability = (candidate.sustainability_score / 10) * 100;
  const motivation = candidate.motivation_score; // Already 0-100

  const stats = [
    { label: 'Crisis Mgmt', value: crisis, color: 'red' },
    { label: 'Sustainability', value: sustainability, color: 'green' },
    { label: 'Motivation', value: motivation, color: 'blue' },
  ];

  return (
    <SimpleGrid cols={1} spacing="lg">
      {stats.map((stat) => (
        <Paper key={stat.label} withBorder p="xs" radius="md">
          <Group justify="space-between">
             <Text size="xs" fw={700} c="dimmed">
              {stat.label}
            </Text>
            <Text fw={700} size="sm">
              {stat.value}%
            </Text>
          </Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.value, color: stat.color }]}
            label={
              <Center>
                <Text c={stat.color} fw={700} size="xl">
                  {stat.value / 10}
                </Text>
              </Center>
            }
          />
        </Paper>
      ))}
      <Paper withBorder p="md" radius="md">
          <Text size="sm" fw={700} mb="xs">Key Skills</Text>
          <SimpleGrid cols={2} spacing="xs">
              {candidate.skills.slice(0, 4).map(skill => (
                  <Text key={skill} size="xs" bg="gray.1" p={4} style={{borderRadius: 4}}>{skill}</Text>
              ))}
          </SimpleGrid>
      </Paper>
    </SimpleGrid>
  );
}

