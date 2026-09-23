import React from "react";
import { Profile, SocialLink } from "@/types/portfolio";
import { Mail, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PlatformIcon } from "@/components/ui/Icons";

export interface ContactInfoProps {
  profile: Profile;
  socials: SocialLink[];
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ profile, socials }) => {
  return (
    <div className="space-y-6">
      {/* Contact Metadata Block */}
      <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-6 shadow-xl">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Direct Channels</h2>

        <div className="space-y-4 text-sm">
          {profile.email && (
            <div className="flex items-start gap-3 text-[var(--text-secondary)]">
              <Mail className="h-5 w-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--text-muted)] block font-mono">Direct Email</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          )}

          {profile.location && (
            <div className="flex items-start gap-3 text-[var(--text-secondary)]">
              <MapPin className="h-5 w-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--text-muted)] block font-mono">Location</span>
                <span className="font-medium text-[var(--text-primary)]">{profile.location}</span>
              </div>
            </div>
          )}

          {profile.availability && (
            <div className="flex items-start gap-3 text-[var(--text-secondary)]">
              <Calendar className="h-5 w-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--text-muted)] block font-mono">Availability Status</span>
                <span className="font-medium text-emerald-400">{profile.availability}</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Verified Social Profiles */}
      {socials && socials.length > 0 && (
        <Card className="p-6 sm:p-8 rounded-2xl glass-elevated border border-[var(--border)] space-y-4 shadow-xl">
          <h3 className="text-xs font-mono text-[var(--accent-primary)] font-bold tracking-wider uppercase">
            VERIFIED SOCIAL & CODE PLATFORMS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all text-xs font-mono font-semibold text-[var(--text-primary)] group"
              >
                <span className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                  <PlatformIcon platform={social.platform} className="h-4 w-4" />
                </span>
                <span className="group-hover:text-[var(--accent-primary)] transition-colors">{social.label}</span>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
