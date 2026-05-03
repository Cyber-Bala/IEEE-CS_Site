from django.db import models


class Event(models.Model):
    """Stores event details from Xypher'26 approval document."""
    EVENT_DAY_CHOICES = [
        (1, 'Day 1'),
        (2, 'Day 2'),
    ]
    EVENT_TYPE_CHOICES = [
        ('technical', 'Technical Event'),
        ('workshop', 'Workshop'),
        ('ctf', 'Capture The Flag'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='technical')
    day = models.IntegerField(choices=EVENT_DAY_CHOICES, default=1)
    duration_hours = models.IntegerField(default=3)
    team_size_min = models.IntegerField(default=1)
    team_size_max = models.IntegerField(default=1)
    fee_ieee_member = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee_non_ieee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_per_team = models.BooleanField(default=True, help_text="True if fee is per team, False if per participant")
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    expected_teams = models.IntegerField(default=20)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    """Stores team information for events that support teams."""
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=10, unique=True, db_index=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.code})"


class Registration(models.Model):
    """Stores registration data for Xypher'26 event participants."""
    YEAR_CHOICES = [
        ('1', '1st Year'),
        ('2', '2nd Year'),
        ('3', '3rd Year'),
        ('4', '4th Year'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    # Personal info
    name = models.CharField(max_length=200)
    email = models.EmailField()
    college_name = models.CharField(max_length=300)
    department = models.CharField(max_length=200)
    year = models.CharField(max_length=1, choices=YEAR_CHOICES)

    # IEEE membership
    is_ieee_member = models.BooleanField(default=False)
    ieee_id = models.CharField(max_length=50, blank=True, null=True)

    # Event details
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')
    is_team_leader = models.BooleanField(default=False)

    # Payment details (prepared for PayPal integration)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default='pending'
    )
    payment_id = models.CharField(max_length=200, blank=True, null=True, help_text="PayPal payment/order ID")
    payment_payer_id = models.CharField(max_length=200, blank=True, null=True, help_text="PayPal payer ID")
    payment_method = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. paypal, manual")
    payment_completed_at = models.DateTimeField(blank=True, null=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.team:
            role = "Leader" if self.is_team_leader else "Member"
            return f"{self.name} - {self.event.name} ({self.team.name} {role})"
        return f"{self.name} - {self.event.name}"
