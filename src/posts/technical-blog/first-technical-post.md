---
title: "Understanding Policy Gradients: A Simple RL Example"
---


In reinforcement learning (RL), **policy gradient algorithms** are a powerful way to train agents to make optimal decisions. These algorithms optimize a policy by computing gradients of expected rewards, often using the **advantage formulation**. In this blog, we’ll walk through a concrete example to demystify policy gradients, focusing on the gradients of the policy probability $\nabla_\theta \pi_\theta(a|s)$ and the log-probability $\nabla_\theta \log \pi_\theta(a|s)$, and how they drive policy updates. Let’s dive into a simple RL scenario and see these concepts in action!

## Who is this Article For?

<ul>
  <li><span class="text-yellow-600 font-medium">Familiar with Reinforcement Learning Framework.</span></li>
  <li><span class="text-yellow-600 font-medium">Familiar with Policy Gradient Algorithms</span></li>
  <li><span class="text-yellow-600 font-medium">Want to learn about Policy Gradient from scratch by hands-on math.</span></li>
</ul>

## The Scenario: A Robot in a 1D Grid World

Imagine a robot navigating a 1D grid with three states: $S_1$, $S_2$, and $S_3$. The goal is to reach $S_3$, the terminal state, which yields a reward of +1. The robot can take two actions in each state:

![ChatGPT Image May 4, 2025, 08_44_50 PM.png](https://file.notion.so/f/f/58bc7733-079f-4e3f-81e5-b5b57a4f8590/3fe18c9c-3589-423a-9a57-942eef17bd7a/ChatGPT_Image_May_4_2025_08_44_50_PM.png?table=block&id=1e91a81f-b775-8028-915c-db193e89f931&spaceId=58bc7733-079f-4e3f-81e5-b5b57a4f8590&expirationTimestamp=1746568800000&signature=dmfLBJTxmwIqSJ7smRwK_o_GH-RUZVAOox6h9XJLy-0&downloadName=ChatGPT+Image+May+4%2C+2025%2C+08_44_50+PM.png)

- **Left**: Move one state left (e.g., $S_2 \to S_1$).
- **Right**: Move one state right (e.g., $S_1 \to S_2$).

**Problem Details**:

- **States**: $\{ S_1, S_2, S_3 \}$, where $S_3$ is terminal.
- **Rewards**:
  - Reaching $S_3$: $R = +1$.
  - All other transitions: $R = 0$.
- **Discount Factor**: $\gamma = 0.9$ (future rewards are discounted).
- **Policy**: A parameterized policy $\pi_\theta(a|s)$ determines the probability of each action.

Our focus will be on state $S_1$, where we’ll compute the policy gradient and update the policy based on a sampled trajectory.

## Steps We Will Follow to Solve this Problem:

- **1. Defining the Policy**: We’ll make a rule (policy function) that tells the robot how likely it is to move Left or Right in each spot. We’ll keep tweaking this rule to help the robot make better choices.
- **2. Simulating a Trajectory**: We’ll let the robot move from one spot to another (like $S_1$ to $S_2$ to $S_3$) and see what steps it takes and what rewards it gets.
- **3. Computing the Return**: We’ll total up the rewards the robot gets during its journey, giving more weight to rewards it gets sooner (since later rewards are less certain).
- **4. Estimating the Advantage**: We’ll figure out if the robot’s moves were better or worse than average, so we can focus on improving the best ones.
- **5. Computing the Gradients**: We’ll look at how much each move changes the robot’s decision rule, so we know how to adjust it.
- **6. Computing the Policy Gradient**: We’ll combine the “how good” and “how to improve” info to decide how to update the robot’s decision rule.
- **7. Updating the Policy**: We’ll tweak the robot’s decision rule a little to make it more likely to pick good moves next time.
- **8. Try a Different Path**: We’ll test what happens if the robot picks a different move (like Left instead of Right) to see how it changes things.

## 1: Defining the Policy

Let’s define the policy for state $S_1$ using a logistic (sigmoid) function parameterized by a single parameter $\theta$:

$$
\pi_\theta(\text{Right} | S_1) = \sigma(\theta) = \frac{1}{1 + e^{-\theta}}
$$

$$
\pi_\theta(\text{Left} | S_1) = 1 - \sigma(\theta) = \frac{e^{-\theta}}{1 + e^{-\theta}}
$$

Initially we can set $\theta = 0$:

$$
\pi_\theta(\text{Right} | S_1) = \sigma(0) = \frac{1}{1 + e^0} = 0.5
$$

$$
\pi_\theta(\text{Left} | S_1) = 0.5
$$

The policy is equally likely to choose **Left** or **Right** in $S_1$.

## 2: Simulating a Trajectory

Let’s simulate a trajectory starting from $S_1$:

1. In $S_1$, the robot chooses **Right** (probability 0.5) and moves to $S_2$. Reward: $R_1 = 0$.
2. In $S_2$, the robot chooses **Right** again, moving to $S_3$. Reward: $R_2 = 1$.
3. In $S_3$, the episode ends (terminal state).

**Trajectory**:

$$
(S_1, \text{Right}, R_1 = 0, S_2, \text{Right}, R_2 = 1, S_3)
$$

## 3: Computing the Return

The **return** $G_t$ is the sum of discounted future rewards from time $t$. For the action in $S_1$ at $t = 0$:

$$
G_0 = R_1 + \gamma R_2 = 0 + 0.9 \cdot 1 = 0.9
$$

This return represents the total discounted reward for the trajectory.

## 4: Estimating the Advantage

Policy gradient algorithms often use the **advantage formulation**:

$$
\nabla_\theta J(\pi_\theta) = \mathbb{E}_{\pi_\theta} \left[ \nabla_\theta \log \pi_\theta(a|s) \cdot A^\pi(s, a) \right]
$$

The advantage $A^\pi(s, a) = Q^\pi(s, a) - V^\pi(s)$ measures how much better an action is compared to the average action in state $s$.

$Q^\pi(S_1, \text{Right})$: The expected return for taking **Right** in $S_1$. From our trajectory, we approximate: $Q^\pi(S_1, \text{Right}) \approx G_0 = 0.9$

Assume we have an estimate:

$V^\pi(S_1) \approx 0.5$

Thus:

$A^\pi(S_1, \text{Right}) = 0.9 - 0.5 = 0.4$

A positive advantage means **Right** was better than average in $S_1$.

## 5: Computing the Gradients

Now, we compute the gradients $\nabla_\theta \pi_\theta(a|s)$ and $\nabla_\theta \log \pi_\theta(a|s)$.

### a) Gradient of the Policy Probability

$\pi_\theta(\text{Right} | S_1) = \sigma(\theta)$

The derivative of the sigmoid is:

$\nabla_\theta \sigma(\theta) = \sigma(\theta) (1 - \sigma(\theta))$

For $\theta = 0$:

$\sigma(0) = 0.5$

$\nabla_\theta \pi_\theta(\text{Right} | S_1) = 0.5 \cdot (1 - 0.5) = 0.25$

This gradient shows that increasing $\theta$ increases the probability of **Right** by 0.25 per unit change in $\theta$.

### b) Gradient of the Log-Probability

Using the chain rule:

$\nabla_\theta \log \pi_\theta(a|s) = \frac{\nabla_\theta \pi_\theta(a|s)}{\pi_\theta(a|s)}$

$\pi_\theta(\text{Right} | S_1) = 0.5$

$\nabla_\theta \pi_\theta(\text{Right} | S_1) = 0.25$

$\nabla_\theta \log \pi_\theta(\text{Right} | S_1) = \frac{0.25}{0.5} = 0.5$

## 6: Computing the Policy Gradient

For our trajectory, we approximate the policy gradient:

$\nabla_\theta J(\pi_\theta) \approx \nabla_\theta \log \pi_\theta(\text{Right} | S_1) \cdot A^\pi(S_1, \text{Right})$

$\nabla_\theta J(\pi_\theta) \approx 0.5 \cdot 0.4 = 0.2$

This positive gradient indicates we should increase $\theta$ to favor **Right**.

## 7: Updating the Policy

Update $\theta$ using gradient ascent:

$\theta \leftarrow \theta + \alpha \nabla_\theta J(\pi_\theta)$

With learning rate $\alpha = 0.1$:

$\theta = 0 + 0.1 \cdot 0.2 = 0.02$

New policy:

$\pi_\theta(\text{Right} | S_1) = \sigma(0.02) \approx \frac{1}{1 + e^{-0.02}} \approx 0.505$

$\pi_\theta(\text{Left} | S_1) = 1 - 0.505 = 0.495$

The probability of **Right** increases slightly, reflecting its positive advantage.

## 8: Exploring the Alternative Action

What if the robot chose **Left** in $S_1$? Suppose **Left** keeps the robot in $S_1$ with $R_1 = 0$, and the episode ends. Then:

- Return: $G_0 = 0$.
- Advantage: $A^\pi(S_1, \text{Left}) \approx 0 - 0.5 = -0.5$.
- Gradients:
  - $\pi_\theta(\text{Left} | S_1) = 0.5$.

  - $\nabla_\theta \pi_\theta(\text{Left} | S_1) = -\sigma(\theta)(1 - \sigma(\theta)) = -0.25$.

  - $\nabla_\theta \log \pi_\theta(\text{Left} | S_1) = \frac{-0.25}{0.5} = -0.5$.


- Policy gradient: $-0.5 \cdot (-0.5) = 0.25$.

- Update: $\theta \leftarrow 0 + 0.1 \cdot 0.25 = 0.025$, increasing $\pi_\theta(\text{Right} | S_1)$.

This shows the policy learns to avoid **Left** and favor **Right**.

## **Why Use $\nabla_\theta \log \pi_\theta(a \mid s)$?**

You might wonder why we use $\nabla_\theta \log \pi_\theta(a|s)$ instead of $\nabla_\theta \pi_\theta(a|s)$. The policy gradient theorem naturally derives:

$$
\nabla_\theta J(\pi_\theta) = \mathbb{E}_{\pi_\theta} \left[ \frac{\nabla_\theta \pi_\theta(a|s)}{\pi_\theta(a|s)} \cdot A^\pi(s, a) \right]
$$

This is equivalent to using $\nabla_\theta \log \pi_\theta(a|s)$, simplifying computations and aligning with policy distribution sampling.

The log-probability gradient reduces variance and is computationally efficient.

## Conclusion

This simple example shows how policy gradients work in practice. In real-world RL, we’d use multiple trajectories, neural network policies, and advanced algorithms like PPO or TRPO, but the core ideas remain the same.