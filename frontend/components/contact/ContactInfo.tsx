import React from "react";
import { Profile, SocialLink } from "@/types/portfolio";
import { Mail, MapPin, Calendar } from "lucide-react";
import { PlatformIcon } from "@/components/ui/Icons";

export interface ContactInfoProps {
  profile: Profile;
  socials: SocialLink[];
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ profile, socials }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-100">Contact Information</h2>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3 text-slate-300">
            <Mail className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-500 block">Direct Email</span>
              <a
                href={`mailto:${profile.email}`}
                className="font-medium hover:text-sky-400 transition-colors"
              >
                {profile.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-300">
            <MapPin className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-500 block">Location</span>
              <span className="font-medium">{profile.location}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-300">
            <Calendar className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-500 block">Availability</span>
              <span className="font-medium text-emerald-400">{profile.availability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono text-sky-400 font-semibold tracking-wider uppercase">
          Social Platforms
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 hover:text-sky-400 transition-all text-xs font-semibold text-slate-300"
            >
              <span className="text-sky-400">
                <PlatformIcon platform={social.platform} className="h-4 w-4" />
              </span>
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
