'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [llmId, setLlmId] = useState('');
  const [temperature, setTemperature] = useState('0.7');
  const [topP, setTopP] = useState('0.9');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement configuration update logic here
    console.log('Update configuration:', { llmId, temperature, topP });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select
              value={llmId}
              onValueChange={setLlmId}
            >
              <Select.Trigger>
                <Select.Value placeholder="Select LLM" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="gpt-3.5-turbo">GPT-3.5 Turbo</Select.Item>
                <Select.Item value="gpt-4">GPT-4</Select.Item>
              </Select.Content>
            </Select>
          </div>
          <div>
            <Input
              type="number"
              placeholder="Temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              min="0"
              max="1"
              step="0.1"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Top P"
              value={topP}
              onChange={(e) => setTopP(e.target.value)}
              min="0"
              max="1"
              step="0.1"
            />
          </div>
          <Button type="submit">Update Configuration</Button>
        </form>
      </CardContent>
    </Card>
  );
}

