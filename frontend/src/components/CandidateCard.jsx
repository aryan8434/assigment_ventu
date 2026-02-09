import { Card, Image, Text, Badge, Group, Title, Blockquote } from '@mantine/core';
import { IconQuote } from '@tabler/icons-react';

export default function CandidateCard({ candidate }) {
  if (!candidate) return null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {/* Placeholder banner if we had one, or just padding */}
        <Group justify="space-between" mt="md" mb="xs" px="md">
            <Group>
                 <Image
                    src={candidate.avatar}
                    h={80}
                    w={80}
                    radius="md"
                    fallbackSrc="https://placehold.co/80x80"
                />
                <div>
                     <Text fw={500} size="lg">{candidate.name}</Text>
                     <Text c="dimmed" size="sm">{candidate.experience_years} Years Experience</Text>
                </div>
            </Group>
            <Badge color="pink" variant="light" size="lg">Rank #{candidate.rank}</Badge>
        </Group>
      </Card.Section>

      <Text size="sm" c="dimmed" mt="sm">
        {candidate.bio}
      </Text>
      
      <Title order={5} mt="md" mb="xs">AI Evaluation Feedback</Title>
      <Blockquote color="blue" icon={<IconQuote size={20} />} mt="xl">
        {candidate.ai_feedback}
      </Blockquote>

      <Group mt="md" mb="xs">
         <Text size="sm" fw={700}>Primary Skills:</Text>
         {candidate.skills.map(skill => (
             <Badge key={skill} variant="outline">{skill}</Badge>
         ))}
      </Group>

    </Card>
  );
}
