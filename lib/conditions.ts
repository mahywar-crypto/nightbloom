export interface MentalHealthTopic {
  slug: string;
  name: string;
  emoji: string;
  summary: string;
  overview: string;
  commonSigns: string[];
  whatMightHelp: string;
}

// General educational descriptions written in plain language, informed by
// widely-used public health references (NIMH, WHO, APA-level consensus).
// These are intentionally NOT diagnostic checklists. Every topic ends with
// its own non-diagnostic note, and the list screen carries a global
// disclaimer too.
export const MENTAL_HEALTH_TOPICS: MentalHealthTopic[] = [
  {
    slug: 'gad',
    name: 'Generalized Anxiety Disorder',
    emoji: '🌀',
    summary: 'Persistent, hard-to-control worry that shows up most days.',
    overview:
      "Generalized anxiety disorder (GAD) involves feeling anxious or worried more days than not, often about a wide range of everyday things like health, work, or relationships, even when there's no clear reason to expect the worst. The worry can feel hard to switch off and often comes with physical tension.",
    commonSigns: [
      'Restlessness or feeling on edge',
      'Trouble controlling worry once it starts',
      'Muscle tension, fatigue, or trouble sleeping',
      'Difficulty concentrating',
      'Worry that lasts most days for six months or more',
    ],
    whatMightHelp:
      'Talk therapy (especially cognitive behavioral therapy), relaxation and breathing techniques, and in some cases medication prescribed by a doctor.',
  },
  {
    slug: 'panic-disorder',
    name: 'Panic Disorder',
    emoji: '💥',
    summary: 'Sudden, intense waves of fear with strong physical symptoms.',
    overview:
      "Panic disorder involves repeated, unexpected panic attacks, sudden waves of intense fear that peak within minutes, along with a persistent worry about when the next one might happen. Physical symptoms like a racing heart, shortness of breath, and dizziness can feel alarming, even though panic attacks themselves aren't dangerous.",
    commonSigns: [
      'Racing heart, chest tightness, or shortness of breath',
      'Sudden dizziness or feeling detached from yourself',
      'A strong urge to escape the situation',
      'Ongoing worry about having another attack',
      "Avoiding places where a panic attack has happened before",
    ],
    whatMightHelp:
      'Grounding and breathing techniques (like the ones in this app), cognitive behavioral therapy, and sometimes medication.',
  },
  {
    slug: 'social-anxiety',
    name: 'Social Anxiety Disorder',
    emoji: '👥',
    summary: 'Intense fear of being judged or embarrassed around others.',
    overview:
      "Social anxiety disorder is more than shyness. It's an intense fear of being watched, judged, or embarrassed in front of others that can make everyday interactions, like eating in public or speaking up in a meeting, feel overwhelming.",
    commonSigns: [
      'Intense worry before social situations, sometimes for days beforehand',
      'Fear of saying or doing something embarrassing',
      'Avoiding situations where you might be watched or judged',
      'Physical symptoms like blushing, sweating, or a shaky voice',
      'Replaying social interactions afterward, worried about how you came across',
    ],
    whatMightHelp:
      'Cognitive behavioral therapy (particularly gradual, supported practice with social situations) and sometimes medication.',
  },
  {
    slug: 'depression',
    name: 'Major Depressive Disorder',
    emoji: '🌧️',
    summary: 'A persistent low mood or loss of interest that affects daily life.',
    overview:
      "Depression is more than sadness. It's a persistent low mood, loss of interest in things you used to enjoy, or a sense of heaviness that lasts most of the day, most days, for at least two weeks, and affects how you function day to day.",
    commonSigns: [
      'Persistent sadness, emptiness, or hopelessness',
      'Losing interest in activities you used to enjoy',
      'Changes in sleep or appetite',
      'Low energy or fatigue, even after rest',
      'Trouble concentrating or making decisions',
      'Thoughts of death or self-harm (if this is you right now, please see the crisis resources below)',
    ],
    whatMightHelp:
      'Therapy, medication, regular movement, and staying connected to other people all have strong evidence behind them, often in combination.',
  },
  {
    slug: 'bipolar',
    name: 'Bipolar Disorder',
    emoji: '🌗',
    summary: 'Shifts between depressive lows and elevated, high-energy highs.',
    overview:
      "Bipolar disorder involves shifts between depressive episodes and periods of unusually elevated mood, energy, or activity, known as mania or hypomania. These aren't just normal mood swings. Episodes can last days to weeks and affect sleep, judgment, and daily functioning.",
    commonSigns: [
      'Periods of unusually high energy, less need for sleep, or racing thoughts',
      'Increased impulsivity or risk-taking during high-energy periods',
      'Depressive episodes that look similar to major depression',
      'Mood shifts that are more intense and longer-lasting than typical ups and downs',
    ],
    whatMightHelp:
      'Diagnosis and treatment from a psychiatrist, mood-stabilizing medication, and therapy are typically central to managing bipolar disorder well.',
  },
  {
    slug: 'ocd',
    name: 'Obsessive-Compulsive Disorder',
    emoji: '🔁',
    summary: 'Unwanted, intrusive thoughts paired with repetitive behaviors to ease them.',
    overview:
      "OCD involves unwanted, intrusive thoughts, images, or urges (obsessions) that cause distress, and repetitive behaviors or mental rituals (compulsions) done to try to reduce that distress or prevent a feared outcome. The cycle can take up significant time and feel hard to stop, even when someone recognizes it doesn't fully make sense.",
    commonSigns: [
      'Intrusive, unwanted thoughts that cause significant anxiety',
      'Repetitive behaviors like checking, counting, or washing',
      'Needing things to feel "just right"',
      'Spending an hour or more a day on obsessions or compulsions',
      "Recognizing the thoughts or behaviors are excessive, but feeling unable to stop",
    ],
    whatMightHelp:
      'A specific type of therapy called Exposure and Response Prevention (ERP) has strong evidence for OCD, often alongside medication.',
  },
  {
    slug: 'ptsd',
    name: 'Post-Traumatic Stress Disorder',
    emoji: '🌪️',
    summary: 'Lasting effects after a deeply distressing or dangerous event.',
    overview:
      'PTSD can develop after experiencing or witnessing a traumatic event, like an accident, violence, or a disaster. It involves the mind and body continuing to react as if the danger is still present, long after the event itself is over.',
    commonSigns: [
      'Unwanted memories, flashbacks, or nightmares about the event',
      'Avoiding reminders of what happened',
      'Feeling constantly on guard or easily startled',
      'Negative changes in mood or thinking, like guilt or feeling detached from others',
      'Symptoms lasting more than a month and affecting daily life',
    ],
    whatMightHelp:
      'Trauma-focused therapies (such as EMDR or trauma-focused cognitive behavioral therapy) are well-supported, along with a strong support network.',
  },
  {
    slug: 'adhd',
    name: 'ADHD',
    emoji: '⚡',
    summary: 'Ongoing patterns of inattention, hyperactivity, or impulsivity.',
    overview:
      "ADHD is a pattern of inattention and/or hyperactivity-impulsivity that's more frequent and intense than what's typical for someone's age, and shows up in more than one setting, like both work and home. It often starts in childhood but is increasingly recognized and diagnosed in adults too.",
    commonSigns: [
      "Difficulty sustaining attention, especially on tasks that aren't inherently interesting",
      'Losing track of things or being easily distracted',
      'Restlessness or difficulty staying seated or still',
      'Acting before thinking things through',
      'Trouble organizing tasks or managing time',
    ],
    whatMightHelp:
      'A combination of practical strategies (routines, tools, therapy) and, for many people, medication prescribed by a doctor.',
  },
  {
    slug: 'bpd',
    name: 'Borderline Personality Disorder',
    emoji: '💧',
    summary: 'Intense emotions, relationship instability, and a shifting sense of self.',
    overview:
      'BPD involves a pattern of intense and unstable emotions, relationships, and self-image, often alongside impulsivity. Emotions can feel like they arrive faster and stronger than for other people, which can be genuinely exhausting to manage without support.',
    commonSigns: [
      'Intense emotional reactions that shift quickly',
      'Fear of real or imagined abandonment',
      'Unstable relationships that swing between idealizing and devaluing someone',
      'An unstable or shifting sense of self or identity',
      'Impulsive behavior in areas like spending, driving, or substance use',
      'Recurring thoughts of self-harm (if this is you right now, please see the crisis resources below)',
    ],
    whatMightHelp:
      'Dialectical Behavior Therapy (DBT) was developed specifically for BPD and has strong evidence behind it.',
  },
  {
    slug: 'eating-disorders',
    name: 'Eating Disorders',
    emoji: '🍽️',
    summary: 'Serious disruptions in eating tied to thoughts about food, weight, or body image.',
    overview:
      'Eating disorders, including anorexia, bulimia, and binge-eating disorder, involve serious disruptions in eating behavior tied to distressing thoughts about food, weight, or body image. They affect people of all genders, ages, and body sizes, and are medical conditions, not lifestyle choices.',
    commonSigns: [
      'Preoccupation with food, weight, or body shape that interferes with daily life',
      "Eating much less or much more than the body needs",
      'Eating in secret or feeling out of control around food',
      'Using food restriction, purging, or excessive exercise to manage emotions or weight',
      'Physical signs like significant weight changes, dizziness, or fatigue',
    ],
    whatMightHelp:
      'Eating disorders usually need a care team (therapist, doctor, and often a dietitian) given both the physical and emotional layers involved. Reaching out early tends to lead to better outcomes.',
  },
];

export function getTopicBySlug(slug: string): MentalHealthTopic | undefined {
  return MENTAL_HEALTH_TOPICS.find((t) => t.slug === slug);
}
