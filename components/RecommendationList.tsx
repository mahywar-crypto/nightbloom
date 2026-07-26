import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './Card';
import { Button } from './Button';
import { cardTint, spacing, typography } from '../lib/theme';
import { Recommendation } from '../lib/content';

interface RecommendationListProps {
  recommendations: Recommendation[];
  heading?: string;
}

export function RecommendationList({ recommendations, heading }: RecommendationListProps) {
  const router = useRouter();
  return (
    <View>
      {heading ? <Text style={[typography.heading, { marginBottom: spacing.sm }]}>{heading}</Text> : null}
      {recommendations.map((r, i) => (
        <Card key={r.title} tint={cardTint(i)} index={i} style={{ marginTop: i === 0 ? 0 : spacing.sm }}>
          <Text style={typography.bodyStrong}>{r.title}</Text>
          <Text style={[typography.body, { marginTop: spacing.xs }]}>{r.body}</Text>
          <Button
            label={r.cta}
            variant="secondary"
            onPress={() => router.push(r.route as never)}
            style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}
          />
        </Card>
      ))}
    </View>
  );
}
