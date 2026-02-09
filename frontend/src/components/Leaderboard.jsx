import { Table, ScrollArea, Avatar, Group, Text } from '@mantine/core';

export default function Leaderboard({ candidates, onSelect, selectedId }) {
  const rows = candidates.map((element) => (
    <Table.Tr 
      key={element.id} 
      onClick={() => onSelect(element.id)}
      bg={selectedId === element.id ? 'var(--mantine-color-blue-light)' : undefined}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td>#{element.rank}</Table.Td>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={26} src={element.avatar} radius={26} />
          <Text size="sm" fw={500}>
            {element.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>{element.total_score}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h="100%">
      <Table verticalSpacing="xs" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Candidate</Table.Th>
            <Table.Th>Score</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
